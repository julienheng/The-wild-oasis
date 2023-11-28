import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lurwihkoxsbzkiehmcwz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1cndpaGtveHNiemtpZWhtY3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNTA5MjksImV4cCI6MjAxNjcyNjkyOX0.CDjtXvpGXCnxPJvhBQMRTkGi4vgLH1Db2n6u75wfg_k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
