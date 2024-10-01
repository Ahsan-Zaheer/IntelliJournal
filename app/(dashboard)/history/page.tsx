import { getUserByClerkId } from "@/utils/auth"
import HistoryChart from "@/components/HistoryChart"
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy:{
      createdAt: 'asc',
    }

  })
  const sum = analyses.reduce((acc, curr) => acc + curr.SentimentScore, 0);
  const avgScore = Math.round(sum / analyses.length);
  return {analyses, avgScore}
}

export default async function History() {


  const {avgScore, analyses} = await getData();
  

  return (
    <div className="w-full h-full">
        <h1 className="text-xl ms-10 mt-5">Avg. Sentiment Score: {avgScore}</h1>
        <HistoryChart data = {analyses}/>
    </div>
  )
}
