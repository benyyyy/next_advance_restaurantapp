// // app/book-table/page.tsx
// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { db } from '@/lib/firebase-admin';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function BookTablePage() {
//   const [date, setDate] = useState<Date | null>(new Date());
//   const [time, setTime] = useState('19:00');
//   const [partySize, setPartySize] = useState(2);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [specialRequests, setSpecialRequests] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const availableTimes = ['11:00', '12:30', '14:00', '17:30', '19:00', '20:30', '22:00'];
//   const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await addDoc(collection(db, 'reservations'), {
//         date,
//         time,
//         partySize,
//         name,
//         email,
//         phone,
//         specialRequests,
//         createdAt: serverTimestamp(),
//         status: 'confirmed'
//       });

//       router.push(`/booking-confirmation?date=${date?.toISOString()}&time=${time}&partySize=${partySize}`);
//     } catch (error) {
//       console.error('Booking error:', error);
//       alert('Failed to book table. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Disable past dates and dates more than 3 months in advance
//   const isDateDisabled = (date: Date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const threeMonthsLater = new Date();
//     threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
//     return date < today || date > threeMonthsLater;
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Book a Table</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Date Picker */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date
//             </label>
//             <DatePicker
//               selected={date}
//               onChange={(date) => setDate(date)}
//               filterDate={isDateDisabled}
//               minDate={new Date()}
//               className="w-full p-2 border rounded-md"
//               dateFormat="MMMM d, yyyy"
//             />
//           </div>

//           {/* Time Selector */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Time
//             </label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             >
//               {availableTimes.map((t) => (
//                 <option key={t} value={t}>{t}</option>
//               ))}
//             </select>
//           </div>

//           {/* Party Size */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Party Size
//             </label>
//             <select
//               value={partySize}
//               onChange={(e) => setPartySize(Number(e.target.value))}
//               className="w-full p-2 border rounded-md"
//             >
//               {partySizes.map((size) => (
//                 <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Special Requests (Optional)
//             </label>
//             <textarea
//               value={specialRequests}
//               onChange={(e) => setSpecialRequests(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               rows={3}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-primary py-3 px-4 rounded-md text-white font-medium hover:bg-primary-dark transition disabled:opacity-50"
//         >
//           {isSubmitting ? 'Booking...' : 'Confirm Reservation'}
//         </button>
//       </form>
//     </div>
//   );
// }