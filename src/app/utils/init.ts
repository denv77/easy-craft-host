export async function fetchManifest(): Promise<any> {
  const bffUrl = `${window.location.origin}/gateway/api/bff`
  try {
    const response = await fetch(`${bffUrl}/manifest`, {
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Если 401, выполняем редирект на SSO
        const locationHref = window.location.origin;
        window.location.href = `${locationHref}/oauth2/authorization/oidc-client`;
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
