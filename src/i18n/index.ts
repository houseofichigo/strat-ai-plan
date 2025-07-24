import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        assessment: 'Assessment',
        workflows: 'Workflows',
        agents: 'AI Agents',
        solutions: 'Agents & Workflows',
        useCases: 'Use Cases',
        training: 'Training',
        resources: 'Resources',
        playground: 'Playground',
        reports: 'Reports',
        roadmap: 'Roadmap',
        admin: 'Admin',
        services: 'Services',
        gdpr: 'GDPR',
      },
      // Onboarding
      onboarding: {
        welcome: 'Welcome to AI Readiness Platform',
        step1Title: 'Take Your Assessment',
        step1Content: 'Start by completing the AI readiness assessment to understand your current capabilities.',
        step2Title: 'Review Your Results',
        step2Content: 'Analyze your readiness scores and identify key areas for improvement.',
        step3Title: 'Build Your Action Plan',
        step3Content: 'Create a personalized roadmap based on your assessment results.',
        skip: 'Skip Tour',
        next: 'Next',
        back: 'Back',
        finish: 'Get Started',
      },
      // Progress
      progress: {
        notStarted: 'Not Started',
        inProgress: 'In Progress',
        completed: 'Completed',
        overall: 'Overall Progress',
        assessment: 'Assessment Progress',
        training: 'Training Progress',
        workflows: 'Workflow Progress',
      },
      // Notifications
      notifications: {
        title: 'Notifications',
        markAllRead: 'Mark All as Read',
        noNotifications: 'No new notifications',
        compliance: 'Compliance Update',
        resources: 'New Resources',
        completion: 'Completion Reminder',
        general: 'General',
      },
      // Common
      common: {
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Information',
      },
      // Solutions
      solutions: {
        title: 'agents and workflows',
        allSolutions: 'All Solutions',
        aiAgents: 'AI Agents',
        workflows: 'Workflows',
        totalSolutions: 'Total Solutions',
        featured: 'Featured Solutions',
        trending: 'Trending Now',
        quickWins: 'Quick Wins',
        highROI: 'High ROI Solutions',
        newArrivals: 'New Arrivals',
      }
    }
  },
  es: {
    translation: {
      nav: {
        dashboard: 'Panel de Control',
        assessment: 'Evaluación',
        workflows: 'Flujos de Trabajo',
        agents: 'Agentes IA',
        solutions: 'Agentes y Flujos',
        useCases: 'Casos de Uso',
        training: 'Capacitación',
        resources: 'Recursos',
        playground: 'Área de Pruebas',
        reports: 'Reportes',
        roadmap: 'Hoja de Ruta',
        admin: 'Administrador',
        services: 'Servicios',
        gdpr: 'GDPR',
      },
      onboarding: {
        welcome: 'Bienvenido a la Plataforma de Preparación para IA',
        step1Title: 'Realiza tu Evaluación',
        step1Content: 'Comienza completando la evaluación de preparación para IA para entender tus capacidades actuales.',
        step2Title: 'Revisa tus Resultados',
        step2Content: 'Analiza tus puntuaciones de preparación e identifica áreas clave de mejora.',
        step3Title: 'Construye tu Plan de Acción',
        step3Content: 'Crea una hoja de ruta personalizada basada en los resultados de tu evaluación.',
        skip: 'Omitir Tour',
        next: 'Siguiente',
        back: 'Atrás',
        finish: 'Comenzar',
      },
      progress: {
        notStarted: 'No Iniciado',
        inProgress: 'En Progreso',
        completed: 'Completado',
        overall: 'Progreso General',
        assessment: 'Progreso de Evaluación',
        training: 'Progreso de Capacitación',
        workflows: 'Progreso de Flujos',
      },
      notifications: {
        title: 'Notificaciones',
        markAllRead: 'Marcar Todo como Leído',
        noNotifications: 'No hay notificaciones nuevas',
        compliance: 'Actualización de Cumplimiento',
        resources: 'Nuevos Recursos',
        completion: 'Recordatorio de Finalización',
        general: 'General',
      },
      common: {
        save: 'Guardar',
        cancel: 'Cancelar',
        edit: 'Editar',
        delete: 'Eliminar',
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        warning: 'Advertencia',
        info: 'Información',
      }
    }
  },
  fr: {
    translation: {
      nav: {
        dashboard: 'Tableau de Bord',
        assessment: 'Évaluation',
        workflows: 'Flux de Travail',
        agents: 'Agents IA',
        solutions: 'Agents et Flux',
        useCases: "Cas d'Usage",
        training: 'Formation',
        resources: 'Ressources',
        playground: "Aire d'Essai",
        reports: 'Rapports',
        roadmap: 'Feuille de Route',
        admin: 'Administrateur',
        services: 'Services',
        gdpr: 'RGPD',
      },
      onboarding: {
        welcome: "Bienvenue sur la Plateforme de Préparation à l'IA",
        step1Title: 'Effectuez votre Évaluation',
        step1Content: "Commencez par compléter l'évaluation de préparation à l'IA pour comprendre vos capacités actuelles.",
        step2Title: 'Examinez vos Résultats',
        step2Content: "Analysez vos scores de préparation et identifiez les domaines clés d'amélioration.",
        step3Title: "Construisez votre Plan d'Action",
        step3Content: 'Créez une feuille de route personnalisée basée sur les résultats de votre évaluation.',
        skip: 'Ignorer la Visite',
        next: 'Suivant',
        back: 'Retour',
        finish: 'Commencer',
      },
      progress: {
        notStarted: 'Non Commencé',
        inProgress: 'En Cours',
        completed: 'Terminé',
        overall: 'Progrès Global',
        assessment: "Progrès de l'Évaluation",
        training: 'Progrès de Formation',
        workflows: 'Progrès des Flux',
      },
      notifications: {
        title: 'Notifications',
        markAllRead: 'Tout Marquer comme Lu',
        noNotifications: 'Aucune nouvelle notification',
        compliance: 'Mise à jour de Conformité',
        resources: 'Nouvelles Ressources',
        completion: 'Rappel de Finalisation',
        general: 'Général',
      },
      common: {
        save: 'Enregistrer',
        cancel: 'Annuler',
        edit: 'Modifier',
        delete: 'Supprimer',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        warning: 'Avertissement',
        info: 'Information',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;