
interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout=({children}:AuthProps)=>{
 return (
<div className="items-center flex justify-center h-full ">
{children}
</div>
 )
}

export default AuthLayout