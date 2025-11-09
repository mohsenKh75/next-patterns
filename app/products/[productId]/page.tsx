'use client'
import { ProductId } from "@/src/PagesComponents/Products/ProductId";
import { useParams } from "next/navigation";

//NOTE: in dynamic pages case remember to suspence the layout children part! 
export default function Product() {
  //NOTE: how to fix the fck params ts issue
  const param = useParams()

  // dynamic param pages could have some layout to render first

  return (
    <ProductId productId={param.productId as string} />
  )

}
// NOTE: we can also render the page dynamic page on server and await the param - what the diff?

// export default async function Product({ params }: { params: { productId: string } }) {
//   //NOTE: how to fix the fck params ts issue
//   const param = await(params) 
//   // dynamic param pages could have some layout to render first

//   return (
//     <ProductId productId={param.productId} />
//   )
// }