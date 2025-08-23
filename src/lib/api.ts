// API service for Laravel backend communication
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:8000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; admin: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async register(name: string, email: string, password: string, password_confirmation: string) {
    const response = await this.request<{ token: string; admin: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async logout() {
    await this.request('/auth/logout', {
      method: 'POST',
    });
    
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async getCurrentAdmin() {
    return this.request<any>('/auth/me');
  }

  // Projects CRUD
  async getProjects() {
    return this.request<{ data: any[] }>('/projects');
  }

  async createProject(data: { title: string; description: string }) {
    return this.request<any>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: { title: string; description: string }) {
    return this.request<any>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Events CRUD
  async getEvents() {
    return this.request<{ data: any[] }>('/events');
  }

  async createEvent(data: { name: string; date: string; location: string }) {
    return this.request<any>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: string, data: { name: string; date: string; location: string }) {
    return this.request<any>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string) {
    return this.request<void>(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Calendar CRUD
  async getCalendarItems() {
    return this.request<{ data: any[] }>('/calendar');
  }

  async createCalendarItem(data: { title: string; start_date: string; end_date: string }) {
    return this.request<any>('/calendar', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCalendarItem(id: string, data: { title: string; start_date: string; end_date: string }) {
    return this.request<any>(`/calendar/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCalendarItem(id: string) {
    return this.request<void>(`/calendar/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getDashboardStats() {
    return this.request<{
      projects: number;
      events: number;
      calendar: number;
      visits: number;
    }>('/admin/stats');
  }

  async getVisits() {
    return this.request<{ data: any[] }>('/visits');
  }

  async getVisitStats() {
    return this.request<{
      totalVisits: number;
      uniqueIPs: number;
      todayVisits: number;
      thisWeekVisits: number;
    }>('/visits/stats');
  }

  // Track visit (public endpoint)
  async trackVisit() {
    return this.request<void>('/track-visit', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();