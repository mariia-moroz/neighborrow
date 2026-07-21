import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const ItemsTable = ({ items }: { items: Item[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='admin-table-head min-w-100'>Item Title</TableHead>
          <TableHead className='admin-table-head'>Category</TableHead>
          <TableHead className='admin-table-head w-40'>Date Created</TableHead>
          <TableHead className='admin-table-head w-25'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell className='admin-table-cell '>
              <div className='flex flex-row gap-2 font-medium items-center'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={40}
                  height={40}
                  loading='eager'
                  className='rounded-md w-10 h-10'
                />
                {item.title}
              </div>
            </TableCell>

            <TableCell className='admin-table-cell'>{item.category}</TableCell>

            <TableCell className='admin-table-cell'>
              {item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : ""}
            </TableCell>

            <TableCell className='admin-table-cell h-full'>
              <div className='flex h-full items-center gap-1'>
                <Button variant='ghost' size='icon' className='size-8' asChild>
                  <Link href={`/items/${item.id}`} aria-label={`View ${item.title}`}>
                    <EyeIcon className='size-5 stroke-secondary' />
                  </Link>
                </Button>
                <Button variant='ghost' size='icon' className='size-8' asChild>
                  <Link href={`/items/${item.id}/delete`} aria-label={`Delete ${item.title}`}>
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

export default ItemsTable;
