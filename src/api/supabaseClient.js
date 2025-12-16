import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// 1. key 확인 
if(!supabaseKey || !supabaseURL){
  console.error('환경변수 에러 발생! env 설정파일 확인 필요');
}

export const supabase = createClient(supabaseURL, supabaseKey);