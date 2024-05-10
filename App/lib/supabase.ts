//import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://efblupaqtpqdapcehfnp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmYmx1cGFxdHBxZGFwY2VoZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1ODQ1MjEsImV4cCI6MjAzMDE2MDUyMX0.IKJ-M2VS6zDVgnyWMhjZctjtXhMtEqfyGYcPdy8OXlo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)