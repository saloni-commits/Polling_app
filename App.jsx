import {useState,useEffect} from "react";
import {client,databases,DB_ID,COLLECTION_ID} from "./lib/appwrite";
import Questions from "./components/Questions";
function App() {
  const [questions,setQuestions]=useState([]);

  useEffect(()=>{
    getQuestionsFromDB();

    const unsubscribe=client.subscribe(`databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,(res)=>{
      console.log(res);
      if(res.events.includes("databases.*.collections.*.documents.*.update")){
        setQuestions(prevQuestions=>{
          return prevQuestions.map(question=>{
            if(question.$id!==res.payload.$id){
              return question;
            }
            return res.payload;
          })
        })
        console.log("updated questions");
      }
    });
    return ()=>{
      unsubscribe();
    }
  },[]);

  async function getQuestionsFromDB() 
  {
    const questions=await databases.listDocuments(DB_ID,COLLECTION_ID);
    setQuestions(questions.documents);
    
  }
  return (
    <main className="conatiner max-w-3xl mx-auto px-4 py-10">
      {questions.map((question)=>(
        <Questions key={question.$id} data={question}/>
      ))}
    </main>
  )
}

export default App
