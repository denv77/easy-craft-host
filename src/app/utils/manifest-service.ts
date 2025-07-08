import {LoadRemoteModuleOptions} from "@angular-architects/native-federation";
import { environment } from '../../environments/environment';

export declare type Manifest = {
    [key: string]: string;
};

export type MfConfig = LoadRemoteModuleOptions & {
    displayName: string;
    routePath: string;
    ngModuleName: string;
    icon: string;
};

async function fetchManifest(): Promise<MfConfig[]> {
    const origin = environment.bffUrl ? environment.bffUrl : window.location.origin
    const bffUrl = `${origin}/gateway/api/bff`
    try {
        const response = await fetch(`${bffUrl}/manifest`, {
            credentials: 'include',
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Если 401, выполняем редирект на SSO
                window.location.href = `${origin}/oauth2/authorization/bff`;
            } else {
                throw new Error(`Failed to fetch manifest: ${response.statusText}`);
            }
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching manifest:', error);
        throw error;
    }
}

class ManifestService {
    private manifest: MfConfig[] | null = null;

    async loadManifest(): Promise<MfConfig[]> {
        try {
            this.manifest = await fetchManifest();
            return this.manifest;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getManifest(): MfConfig[] | null {
        return this.manifest;
    }
}

export const manifestService = new ManifestService();
