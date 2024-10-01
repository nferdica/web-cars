import { Link, useNavigate } from "react-router-dom";
import logoimg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const schema = z.object({
  name: z.string().nonempty("Campo obrigatório"),
  email: z.string().email("Insira um e-mail válido").nonempty("Campo obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("Campo obrigatório")	
})

type FormData = z.infer<typeof schema>;

export function Register() {
    const { handleInfoUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange"
    })

    useEffect(() => {
      async function handleLogout(){
        await signOut(auth)
      }

      handleLogout()
    }, [])

    async function onSubmit(data: FormData) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name
        })
        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid
        })
        navigate("/dashboard", {replace: true})
      })
      .catch((error) => {
        console.error(error)
      })
    }

    return(
      <Container>
        <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
          <Link to="/" className="mb-6 max-w-sm w-full">
            <img src={logoimg} alt="Logo" className="w-full"/>
          </Link>

          <form className="bg-white max-w-xl w-full rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Digite seu nome completo..."
                name="name"
                error={errors.name?.message}
                register={register}
              />
            </div>

            <div className="mb-3">
              <Input
                type="email"
                placeholder="Digite seu e-mail..."
                name="email"
                error={errors.email?.message}
                register={register}
              />
            </div>

            <div className="mb-3">
              <Input
                type="password"
                placeholder="Digite sua senha..."
                name="password"
                error={errors.password?.message}
                register={register}
              />
            </div>

            <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
              Cadastrar
            </button>

          </form>

          <Link to="/login">Já possui uma conta? Faça o login!</Link>

        </div>
      </Container>
    )
  }
