import AddTodo from "@/components/AddTodo";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import { useRouter } from "next/router";

const Home:React.FC = () =>{
  const router = useRouter();
  const { username} = router.query;
  const randomAboutValue = Math.random().toString(36).substring(7);
  
    return (
        <div>
          <Header />
          <TodoList />
          <AddTodo />
          <button onClick={()=>{
             router.push(`/[username]/[about]`, `/${username}/${randomAboutValue}`);
          }}>About Page</button>
        </div>
      );
}

export default Home;