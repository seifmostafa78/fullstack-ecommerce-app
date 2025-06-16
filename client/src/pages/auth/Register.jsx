import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Form from "../../components/auth/Form";

const Register = () => {
return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`
        }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-light text-center text-gray-800">
              Create new account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form/>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
