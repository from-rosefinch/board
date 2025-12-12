import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseKEY = process.env.REACT_APP_SUPABASE_KEY;
console.log(supabaseKEY);
console.log(supabaseURL);
if( !supabaseKEY || !supabaseURL ){
    console.error('환경변수에러! evn 설정파일 확인 필요');
}

const supabase = createClient(supabaseURL, supabaseKEY);
console.log(supabase);