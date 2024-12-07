import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button'


export default function Login (){
  const [loading,setLoading]=useState(false)
const handleSignIn = async () => {
  try {
    setLoading(true)
    const result = await signIn('google',{callbackUrl:"/campusambassador"});
    
    
    if (result?.error) {
      setLoading(false)
      alert('Please fill the campus ambassador form first');
      router.push('/campus-ambassador-form');
    }
  } catch (error) {
    setLoading(false)
    console.error('Sign in error:', error);
    alert('An error occurred during sign in');
  }
};
return (
    <div className='mt-4'>
    <GoogleButton
    disabled={loading}
  onClick={handleSignIn}
/>
  </div>
)
}                              

