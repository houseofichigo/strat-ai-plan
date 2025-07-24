export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action_details: Json | null
          action_type: string
          created_at: string | null
          department: string | null
          id: string
          license_id: string | null
          user_id: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          created_at?: string | null
          department?: string | null
          id?: string
          license_id?: string | null
          user_id: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          created_at?: string | null
          department?: string | null
          id?: string
          license_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      license_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string
          id: string
          license_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by: string
          id?: string
          license_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string
          id?: string
          license_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "license_assignments_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses: {
        Row: {
          company_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          license_owner_id: string
          plan: Database["public"]["Enums"]["license_plan"]
          seats_total: number
          seats_used: number | null
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          license_owner_id: string
          plan: Database["public"]["Enums"]["license_plan"]
          seats_total: number
          seats_used?: number | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          license_owner_id?: string
          plan?: Database["public"]["Enums"]["license_plan"]
          seats_total?: number
          seats_used?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_text: string | null
          action_url: string | null
          category: string
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_text?: string | null
          action_url?: string | null
          category?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_text?: string | null
          action_url?: string | null
          category?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          last_activity: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id?: string
          last_activity?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_activity?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      usage_stats: {
        Row: {
          agents_deployed: number | null
          created_at: string | null
          date: string
          id: string
          license_id: string | null
          login_count: number | null
          time_on_platform: number | null
          trainings_completed: number | null
          trainings_started: number | null
          use_cases_explored: number | null
          user_id: string
          workflows_launched: number | null
        }
        Insert: {
          agents_deployed?: number | null
          created_at?: string | null
          date: string
          id?: string
          license_id?: string | null
          login_count?: number | null
          time_on_platform?: number | null
          trainings_completed?: number | null
          trainings_started?: number | null
          use_cases_explored?: number | null
          user_id: string
          workflows_launched?: number | null
        }
        Update: {
          agents_deployed?: number | null
          created_at?: string | null
          date?: string
          id?: string
          license_id?: string | null
          login_count?: number | null
          time_on_platform?: number | null
          trainings_completed?: number | null
          trainings_started?: number | null
          use_cases_explored?: number | null
          user_id?: string
          workflows_launched?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_stats_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          language: string
          notifications_enabled: boolean | null
          onboarding_completed: boolean | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string
          notifications_enabled?: boolean | null
          onboarding_completed?: boolean | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          notifications_enabled?: boolean | null
          onboarding_completed?: boolean | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          last_accessed: string | null
          module_id: string
          module_type: string
          progress_percentage: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_accessed?: string | null
          module_id: string
          module_type: string
          progress_percentage?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          last_accessed?: string | null
          module_id?: string
          module_type?: string
          progress_percentage?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_license: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_license_owner: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "license_owner" | "user"
      license_plan: "starter_3" | "business_5" | "enterprise_10"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "license_owner", "user"],
      license_plan: ["starter_3", "business_5", "enterprise_10"],
    },
  },
} as const
