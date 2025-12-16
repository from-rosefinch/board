import {supabase} from './supabaseClient'

/*회원가입 처리 */
// email, password, nickname 입력받기 -> INSERT INTO 
//조건 : 중복되는 email이 있으면 회원가입 불가. 
export const registerUser = async ({email, password, nickname}) => {
  //이메일 중복 체크 
  const {data:existUser} = await supabase
    .from('users')
    .select('*')
    .eq('email',email)
    .eq('is_active',true)
    .single();

  if(existUser){
    throw new Error('이미 존재하는 이메일 입니다.')
  }
  //데이터 삽입 
  const {data, error} = await supabase 
    .from('users')
    // .insert({email:email, password:password, nickname:nickname})
    //키와 값이 같으면 생략 가능 
    .insert({email, password, nickname})
    .select();

    if(error){
      throw new Error('회원가입 실패!');
    }
    return data[0];
}


// 로그인 처리 
// email, password가 정상적으로 되어있는지 체크하기 

export const loginUser = async  ({email, password}) => {
  /*
    SELECT * FROM users
    WHERE email=email ans password = password
  */ 
  console.log(email, password);
  const {data, error} = await supabase
    .from('users')
    .select('*')
    //.eq('컬럼명',입력받은값)
    .eq('email',email)
    .eq('password',password)
    //.single === LIMIT()
    .single(); //limit 1 

    //data값이 없을 때 에러 출력하기
    if(error || !data){
      throw new Error('이메일 또는 비밀번호가 잘못되었습니다.')
    }
    //값이 정상적일때 전달 받은 값을 data에 돌려주기
    return data;
}

//회원탈퇴 : is_activ: false
export const deleteUser = async (userID) => {
  const {data,error} = await supabase
    .from('users')
    .update({is_active:'false'})
    .eq('id',userID)
    .select();
    if( error ){
      throw new Error('회원탈퇴시 오류 발생');
    }
    return data[0];
}