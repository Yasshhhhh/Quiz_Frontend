import { error } from "console";

type ScorePageProps = {
    score: number;
    title: string;
    icon: string;
    iconbg: string;
    numberOfQuestions: number;
    quiz:string,
  };
  
  const ScorePage = ({
    title,
    icon,
    iconbg,
    score,
    numberOfQuestions,
    quiz,
  }: ScorePageProps) => 
  {
    const token = localStorage.getItem('token');

   const handleSubmit=async()=>
   {
    const payload={
      user:"yash",
      topic:title,
      quiz_data:quiz,
      score:score*10,
    }
    console.log(payload);

    try 
    {
     const response=await fetch('http://127.0.0.1:8000/submit',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Token ${token}`

      },
      body:JSON.stringify(payload)
     });
    } catch (error) 
    {
      console.error('Error fetching quiz:', error);
      alert('Failed to fetch quiz');
    }
    
    window.location.href = "/home"
   } 
    return (
      <section className="mt-8 px-6 sm:px-16 xl:mt-0 xl:flex xl:px-0">
        <div className="xl:w-1/2 ml-40 mt-16">
          <h2 className="italic text-white text-[40px] font-extralight leading-none sm:text-[64px]">
            Quiz completed
          </h2>
          <h3 className="italic text-white text-[40px] font-black leading-snug sm:text-[64px]">
            You scored...
          </h3>
        </div>
        <div className="xl:w-1/2 xl:space-y-8 mt-10">
          <section className="mb-3 mt-10 flex flex-col items-center rounded-xl bg-white p-8 drop-shadow-sm dark:bg-navy sm:p-12 xl:mb-0 xl:mt-0 xl:w-[564px]">
            <div className="flex h-[72px] items-center justify-center">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-[18px] font-medium sm:text-[28px]">
                  {title}
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-[88px] font-medium sm:text-[144px]">{score*10}</h4>
              <h5 className="text-lg font-light dark:text-lightBluish sm:text-2xl">
                out of {numberOfQuestions*10}
              </h5>
            </div>
          </section>
          <button
            className="hover:bg-btnHover h-14 w-full rounded-xl bg-purple py-2 text-[18px] font-medium text-white transition-all duration-200 ease-in-out sm:h-[92px] sm:rounded-3xl sm:text-[28px] xl:w-[564px]"
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        </div>
      </section>
    );
  };
  
  export default ScorePage;