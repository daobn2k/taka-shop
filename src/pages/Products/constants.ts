import { IInfoCategory } from '@/store/category/category';

export const formatDataMenu = (data: any[]) => {
  return (
    data?.length &&
    data?.map((ele: IInfoCategory) => ({
      ...formatValue(ele),
      children:
        ele?.children && ele?.children?.length > 0
          ? ele.children?.map((child: IInfoCategory) => formatValue(child))
          : false,
      data: ele,
    }))
  );
};

const formatValue = (data: IInfoCategory) => {
  return {
    key: `${data?.id}`,
    label: data?.name,
  };
};
