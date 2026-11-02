// import { Button } from "../ui/button";
// import { Calendar } from "../ui/calendar";
// import { useSearchParams } from "react-router";
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";

// function HomeFilter() {
//   const [, setParams] = useSearchParams();
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState(new Date());
//   useEffect(() => {
//     setParams((params) => {
//       params.set("month", String(date.getMonth() + 1));
//       params.set("year", String(date.getFullYear()));
//       return params;
//     });
//   }, [date]);

//   function handleSelect(data: Date | undefined) {
//     if (data === undefined) {
//       return setOpen(false);
//     }
//     setDate(data);
//     setOpen(false);
//   }
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger
//         render={<Button variant={"ghost"} className="rounded-full" />}
//       >
//         Período
//       </DialogTrigger>
//       <DialogContent className={"flex w-full flex-col"}>
//         <DialogHeader>
//           <DialogTitle className={"text-center"}>
//             Selecione o mês e ano
//           </DialogTitle>
//         </DialogHeader>
//         <div className="w-full">
//           <Calendar
//             mode="single"
//             required
//             selected={date}
//             onSelect={(e) => handleSelect(e)}
//             captionLayout="dropdown"
//             className="w-full"
//             timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default HomeFilter;
