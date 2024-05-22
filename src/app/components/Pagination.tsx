'use client';

import { generatePagination } from '@/utils/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import ExternalLinkButton from './ExternalLinkButton';
import PageButton from './PageButton';

type Props = {
  totalPages: number | undefined;
};

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, Number(totalPages));

  return (
    <HStack align='center' justify='center' mt='6'>
      <ExternalLinkButton
        href={createPageUrl(currentPage - 1)}
        isDisabled={currentPage <= 1}
      >
        <ChevronLeftIcon />
      </ExternalLinkButton>
      {allPages.map((page, index) => {
        return (
          <PageButton
            href={createPageUrl(page)}
            isActive={currentPage === page}
            key={index}
          >
            {page}
          </PageButton>
        );
      })}
      <ExternalLinkButton
        href={createPageUrl(currentPage + 1)}
        isDisabled={currentPage >= totalPages!}
      >
        <ChevronRightIcon />
      </ExternalLinkButton>
    </HStack>
  );
}
