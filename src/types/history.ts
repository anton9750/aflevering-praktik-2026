export interface HistoryEventLink {
  title: string
  link: string
}

export interface HistoryEvent {
  year: string
  text: string
  html: string
  no_year_html: string
  links: HistoryEventLink[]
}

export interface HistoryData {
  date: string
  url: string
  data: {
    Events: HistoryEvent[]
    Births: HistoryEvent[]
    Deaths: HistoryEvent[]
  }
}
