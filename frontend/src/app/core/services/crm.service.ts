import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead, Opportunity, Campaign, Account, Contact, Task, Ticket, Interaction } from '../models/crm.model';
import { environment } from '../../../environments/environment';

// service qui gere les appels HTTP vers le backend CRM (.NET 8) via l'API Gateway Nginx (port 8000)
@Injectable({ providedIn: 'root' })
export class CrmService {
  private http = inject(HttpClient);

  // URL de base de l'API CRM (passee par l'API Gateway Nginx)
  private apiUrl = environment.apiUrl + '/api/crm';

  // ==========================================================
  // LEADS
  // ==========================================================
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}/leads`);
  }
  getLead(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/leads/${id}`);
  }
  createLead(lead: Partial<Lead>): Observable<Lead> {
    return this.http.post<Lead>(`${this.apiUrl}/leads`, lead);
  }
  updateLead(id: number, lead: Partial<Lead>): Observable<any> {
    return this.http.put(`${this.apiUrl}/leads/${id}`, lead);
  }
  deleteLead(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/leads/${id}`);
  }
  // Le backend expose POST /api/crm/leads/{id}/convert
  convertLead(id: number): Observable<Opportunity> {
    return this.http.post<Opportunity>(`${this.apiUrl}/leads/${id}/convert`, {});
  }

  // ==========================================================
  // CAMPAGNES
  // ==========================================================
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.apiUrl}/campagnes`);
  }
  getCampaign(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/campagnes/${id}`);
  }
  createCampaign(campaign: Partial<Campaign>): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.apiUrl}/campagnes`, campaign);
  }
  updateCampaign(id: number, campaign: Partial<Campaign>): Observable<any> {
    return this.http.put(`${this.apiUrl}/campagnes/${id}`, campaign);
  }
  deleteCampaign(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/campagnes/${id}`);
  }

  // ==========================================================
  // OPPORTUNITES
  // ==========================================================
  getOpportunities(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.apiUrl}/opportunites`);
  }
  getOpportunity(id: number): Observable<Opportunity> {
    return this.http.get<Opportunity>(`${this.apiUrl}/opportunites/${id}`);
  }
  createOpportunity(opp: Partial<Opportunity>): Observable<Opportunity> {
    return this.http.post<Opportunity>(`${this.apiUrl}/opportunites`, opp);
  }
  updateOpportunity(id: number, opp: Partial<Opportunity>): Observable<any> {
    return this.http.put(`${this.apiUrl}/opportunites/${id}`, opp);
  }
  deleteOpportunity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/opportunites/${id}`);
  }

  // ==========================================================
  // INTERACTIONS
  // ==========================================================
  getInteractions(): Observable<Interaction[]> {
    return this.http.get<Interaction[]>(`${this.apiUrl}/interactions`);
  }
  getInteraction(id: number): Observable<Interaction> {
    return this.http.get<Interaction>(`${this.apiUrl}/interactions/${id}`);
  }
  createInteraction(inter: Partial<Interaction>): Observable<Interaction> {
    return this.http.post<Interaction>(`${this.apiUrl}/interactions`, inter);
  }
  updateInteraction(id: number, inter: Partial<Interaction>): Observable<any> {
    return this.http.put(`${this.apiUrl}/interactions/${id}`, inter);
  }
  deleteInteraction(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/interactions/${id}`);
  }

  // ==========================================================
  // TICKETS
  // ==========================================================
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/tickets`);
  }
  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/tickets/${id}`);
  }
  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/tickets`, ticket);
  }
  updateTicket(id: number, ticket: Partial<Ticket>): Observable<any> {
    return this.http.put(`${this.apiUrl}/tickets/${id}`, ticket);
  }
  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tickets/${id}`);
  }

  // ==========================================================
  // TASKS
  // Remarque : le backend expose /api/tasks (hors du prefixe /api/crm).
  // Si vous utilisez l'API Gateway Nginx, ajoutez une route /api/tasks qui
  // redirige vers crm-service:5000. Sinon, l'URL complete est utilisee ici.
  // ==========================================================
  private tasksUrl = environment.apiUrl + '/api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.tasksUrl}/${id}`);
  }
  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task);
  }
  updateTask(id: number, task: Partial<Task>): Observable<any> {
    return this.http.put(`${this.tasksUrl}/${id}`, task);
  }
  deleteTaskApi(id: number): Observable<any> {
    return this.http.delete(`${this.tasksUrl}/${id}`);
  }

  // ==========================================================
  // ACCOUNTS & CONTACTS (mock local - pas d'endpoint backend actuel)
  // ==========================================================
  accounts: Account[] = [
    { id: 1, nom: 'TechnoMaroc SARL', email: 'contact@technomaroc.ma', telephone: '0522-112233', responsable: 'Marwan Kiker' }
  ];
  contacts: Contact[] = [
    { id: 1, nom: 'Ahmed Bennani', type: 'Decideur', adresse: 'Casablanca', accountId: 1 }
  ];
  // Mock local conserves pour compat avec pages existantes
  tasks: Task[] = [
    { id: 1, titre: 'Appeler', description: 'Suivi', dateEcheance: '2026-02-25', priorite: 'Haute', statut: 'A_FAIRE', assigneA: 'Marwan Kiker' }
  ];
  tickets: Ticket[] = [
    { id: 1, sujet: 'Bug', statut: 'OUVERT', priorite: 'Haute', dateCreation: '2026-02-10', accountId: 1, agent: 'Abdellah Ajebli' }
  ];
  interactions: Interaction[] = [
    { id: 1, type: 'Appel', dateInteraction: '2026-02-15', contactId: 1, notes: 'Discussion' }
  ];

  getAccountName(id: number): string {
    const acc = this.accounts.find(a => a.id === id);
    return acc ? acc.nom : 'Inconnu';
  }
  getContactName(id: number): string {
    const c = this.contacts.find(c => c.id === id);
    return c ? c.nom : 'Inconnu';
  }
  private nextId(list: any[]): number {
    return list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1;
  }

  addAccount(account: Partial<Account>): void {
    this.accounts.push({ ...account, id: this.nextId(this.accounts) } as Account);
  }
  deleteAccount(id: number): void {
    this.accounts = this.accounts.filter(a => a.id !== id);
  }

  addContact(contact: Partial<Contact>): void {
    this.contacts.push({ ...contact, id: this.nextId(this.contacts) } as Contact);
  }
  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }

  addTask(task: Partial<Task>): void {
    this.tasks.push({ ...task, id: this.nextId(this.tasks) } as Task);
  }
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  addTicket(ticket: Partial<Ticket>): void {
    this.tickets.push({ ...ticket, id: this.nextId(this.tickets) } as Ticket);
  }
  deleteTicketLocal(id: number): void {
    this.tickets = this.tickets.filter(t => t.id !== id);
  }

  addInteraction(inter: Partial<Interaction>): void {
    this.interactions.push({ ...inter, id: this.nextId(this.interactions) } as Interaction);
  }
}