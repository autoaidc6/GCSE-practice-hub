export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  iconLink: string;
}

export const GoogleDriveService = {
  async getAuthUrl(): Promise<string> {
    const response = await fetch('/api/auth/google/url');
    const data = await response.json();
    return data.url;
  },

  async getAuthStatus(): Promise<boolean> {
    const response = await fetch('/api/auth/status');
    const data = await response.json();
    return data.isAuthenticated;
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  async getFiles(): Promise<DriveFile[]> {
    const response = await fetch('/api/drive/files');
    if (!response.ok) {
      if (response.status === 401) return [];
      throw new Error('Failed to fetch files');
    }
    return response.json();
  },

  async getSheetData(spreadsheetId: string): Promise<any[][]> {
    const response = await fetch(`/api/sheets/data/${spreadsheetId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }
    return response.json();
  }
};
