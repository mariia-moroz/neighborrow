import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleCheckIcon, CircleXIcon, NotepadTextIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const BorrowRequestTable = ({ requests }: { requests: BorrowRequest[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='admin-table-head min-w-80'>Item</TableHead>
          <TableHead className='admin-table-head min-w-80'>User Requested</TableHead>
          <TableHead className='admin-table-head w-40'>Status</TableHead>
          <TableHead className='admin-table-head w-40'>Borrowed Date</TableHead>
          <TableHead className='admin-table-head w-40'>Due Date</TableHead>
          <TableHead className='admin-table-head w-40'>Return Date</TableHead>
          <TableHead className='admin-table-head w-25'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map(request => (
          <TableRow key={request.id}>
            <TableCell className='admin-table-cell '>
              <div className='flex flex-row gap-2 font-medium items-center'>
                <Image
                  src={request.item.image}
                  alt={request.item.title}
                  width={40}
                  height={40}
                  loading='eager'
                  className='rounded-md w-10 h-10'
                />
                {request.item.title}
              </div>
            </TableCell>

            <TableCell className='admin-table-cell '>
              <div className='flex flex-row gap-2 font-medium items-center'>
                <Image
                  src='/icons/profile-icon.svg'
                  alt={request.user.fullName}
                  width={36}
                  height={36}
                  loading='eager'
                  className='rounded-md w-9 h-9'
                />
                <div>
                  <p>{request.user.fullName}</p>
                  <p className='text-xs text-muted-special-text'>{request.user.email}</p>
                </div>
              </div>
            </TableCell>

            <TableCell className='admin-table-cell'>{request.status}</TableCell>

            <TableCell className='admin-table-cell'>
              {request.borrowDate ? new Date(request.borrowDate).toISOString().split("T")[0] : ""}
            </TableCell>

            <TableCell className='admin-table-cell'>
              {request.dueDate ? new Date(request.dueDate).toISOString().split("T")[0] : ""}
            </TableCell>

            <TableCell className='admin-table-cell'>
              {request.returnDate ? new Date(request.returnDate).toISOString().split("T")[0] : "Not returned"}
            </TableCell>

            <TableCell className='admin-table-cell h-full'>
              <div className='flex h-full items-center gap-0.5'>
                <Button variant='ghost' size='icon' className='size-8' asChild>
                  <Link href={`/items/${request.id}/approve`} aria-label={`Approve ${request.id}`}>
                    <CircleCheckIcon className='size-5 stroke-success-icon' />
                  </Link>
                </Button>
                <Button variant='ghost' size='icon' className='size-8' asChild>
                  <Link href={`/items/${request.id}/delete`} aria-label={`Reject ${request.id}`}>
                    <CircleXIcon className='size-5 stroke-destructive' />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BorrowRequestTable;
