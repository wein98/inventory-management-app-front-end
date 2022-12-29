import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
export default function VariationByParentProductsColumnsTable(props) {
  const { columnsData, tableData, productSKU, variationByProductData } = props;
  console.log(variationByProductData);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => variationByProductData, [variationByProductData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex:0, pageSize:10 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          {`Variation products of parent product SKU ${productSKU}`}
        </Text>
        <Spacer />
        <Flex align='center'>
        <IconButton
          bg={bgButton}
          borderRadius="10px"
          mr = "4"
          icon={<ChevronLeftIcon boxSize={5}
          onClick={() => previousPage()} disabled={!canPreviousPage} />}
        />
        <Heading mr="4" size="md">
          {pageIndex + 1} of {pageOptions.length}
        </Heading>
        <IconButton
          bg={bgButton}
          borderRadius="10px"
          icon={<ChevronRightIcon boxSize={5}
          onClick={() => nextPage()} disabled={!canNextPage} />}
        />
        </Flex>      </Flex>
      <Flex px='25px' justify='space-between' mb='20px'>
        <Text
          color={textColor}
          fontSize='18px'
          lineHeight='100%'>
            <p>{`Product name: ${tableData.name}`}</p>
            <p>{`Category: ${tableData.category}`}</p>
            <p>{`Product ID: ${tableData.product_code}`}</p>
            <p>{`Workmanship: ${tableData.workmanship}`}</p>
            <p>{`Total weight (g): ${variationByProductData.reduce((partialSum, x) => partialSum + x.weight, 0)}`}</p>
        </Text>
      </Flex>

      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "PRODUCT_ID") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "SKU") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "WEIGHT (g)") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "LENGTH (cm)") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "SIZE") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "PURCHASE DATE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
