import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Returns the appropriate table name based on the environment.
 * In production, uses the original table name.
 * In development, prefixes the table name with "dev_".
 *
 * @param {string} tableName - The base table name
 * @returns {string} The environment-specific table name
 */
export function getTableName(tableName) {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? tableName : `dev_${tableName}`;
}
