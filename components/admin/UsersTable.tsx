import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import type { SelectUser } from "@/database/schema";

const UsersTable = ({ users }: { users: SelectUser[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='admin-table-head min-w-60'>Name</TableHead>
          <TableHead className='admin-table-head w-40'>Date Joined</TableHead>
          <TableHead className='admin-table-head w-40'>Role</TableHead>
          <TableHead className='admin-table-head w-40'>Items Borrowed</TableHead>
          <TableHead className='admin-table-head w-100'>Address</TableHead>
          <TableHead className='admin-table-head w-40'>Verification</TableHead>
          <TableHead className='admin-table-head w-25'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell className='admin-table-cell '>
              <div className='flex flex-row gap-2 font-medium items-center'>
                <Image
                  src='/icons/profile-icon.svg'
                  alt={user.fullName}
                  width={36}
                  height={36}
                  loading='eager'
                  className='rounded-md w-9 h-9'
                />
                <div>
                  <p>{user.fullName}</p>
                  <p className='text-xs text-muted-special-text'>{user.email}</p>
                </div>
              </div>
            </TableCell>

            <TableCell className='admin-table-cell'>
              {user.createdAt ? new Date(user.createdAt).toISOString().split("T")[0] : ""}
            </TableCell>

            <TableCell className='admin-table-cell'>{user.role}</TableCell>

            <TableCell className='admin-table-cell'>{user.itemsBorrowed}</TableCell>

            <TableCell className='admin-table-cell'>{user.address}</TableCell>

            <TableCell className='admin-table-cell'>
              <Link
                href={user.idConfirmation}
                aria-label={`View id confirmation`}
                className='flex gap-1 px-3 py-1 rounded-lg border border-border w-fit'
              >
                <EyeIcon className='size-5 stroke-secondary' />
                <p className='font-bold text-secondary'>View ID</p>
              </Link>
            </TableCell>

            <TableCell className='admin-table-cell h-full'>
              <div className='flex h-full gap-0.5 items-center'>
                <Button variant='ghost' size='icon' className='size-8' asChild>
                  <Link href={`/users/${user.id}/delete`} aria-label={`Delete ${user.fullName}`}>
                    <Trash2Icon className='size-5 stroke-destructive' />
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

export default UsersTable;
