export interface Designation {
  id: string;
  date: string;
  time: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  address: string;
  role: string;
  status: 'À venir' | 'Effectuée';
  pdfName?: string;
  matchSheetName?: string;
  isVolunteering: boolean; // false = désignation officielle, true = bénévolat club
}