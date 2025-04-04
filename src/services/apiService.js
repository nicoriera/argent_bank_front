// URL de base pour l'API backend
const BASE_URL = "http://localhost:3001/api/v1"; // Chemin de base de l'API

/**
 * Gère la réponse d'un appel fetch.
 * @param {Response} response - La réponse de fetch.
 * @returns {Promise<any>} - Les données JSON du corps de la réponse.
 * @throws {Error} - Lance une erreur si la réponse n'est pas ok.
 */
const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `Erreur HTTP ${response.status}`;
    try {
      // Essayer de lire le message d'erreur du backend
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Ignorer l'erreur de parsing si le corps est vide ou non-JSON
    }
    throw new Error(errorMessage);
  }
  // Gérer les cas où la réponse est OK mais le corps est vide (ex: 204 No Content)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return {}; // Retourner un objet vide si pas de JSON
};

/**
 * Effectue l'appel API pour la connexion utilisateur.
 * @param {object} credentials - Les informations d'identification (email, password).
 * @returns {Promise<object>} - La réponse de l'API (contenant le token).
 */
export const loginApi = async (credentials) => {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await handleApiResponse(response);
  return data.body; // Retourne le corps de la réponse qui contient le token
};

/**
 * Effectue l'appel API pour récupérer le profil utilisateur.
 * @param {string} token - Le token JWT d'authentification.
 * @returns {Promise<object>} - Les données du profil utilisateur.
 */
export const getUserProfileApi = async (token) => {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await handleApiResponse(response);
  return data.body; // Retourne le corps de la réponse qui contient le profil
};

/**
 * Effectue l'appel API pour mettre à jour le profil utilisateur.
 * @param {string} token - Le token JWT d'authentification.
 * @param {object} userData - Les données à mettre à jour (firstName, lastName).
 * @returns {Promise<object>} - Les données du profil utilisateur mises à jour.
 */
export const updateUserProfileApi = async (token, userData) => {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await handleApiResponse(response);
  return data.body; // Retourne le corps de la réponse qui contient le profil mis à jour
};

// BASE_URL n'a plus besoin d'être exporté directement
// export { BASE_URL };
