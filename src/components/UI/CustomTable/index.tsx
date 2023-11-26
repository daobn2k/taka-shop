import React, { useMemo, useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Empty, Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import classNames from 'classnames';
import './custom-ant-table.scss';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React?.Children?.map(children, (child: any) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                  fontSize: 16,
                  width: 16,
                  height: 16,
                }}
                className='icon-drag'
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
interface ICustomTable extends TableProps<any> {
  dataSource: any[];
  columns: any[];
  onDragEnd?: ({ active, over }: DragEndEvent, data: any[]) => void;
  disableDrag?: boolean;
  isTree?: boolean;
  scroll?: any;
  style?: React.CSSProperties;
  loading?: boolean;
  emptyText?: React.ReactNode | string;
}
const flattenArrayTree = (tree = [] as any[]) => {
  const result: any[] = [];
  function flattenNode(node: any) {
    result.push(node);
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        flattenNode(child);
      }
    }
  }
  for (const child of tree) {
    flattenNode(child);
  }
  return result;
};

const CustomTable = (props: ICustomTable) => {
  const {
    columns,
    dataSource = [],
    onDragEnd,
    disableDrag = true,
    isTree,
    emptyText,
    ...rest
  } = props;
  // for tree
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);

  const itemsKey = useMemo(() => {
    return isTree ? flattenArrayTree(dataSource) : dataSource;
  }, [dataSource, isTree]);

  const handleExpanded = (e: any, callback: any, record: any, expanded: any) => {
    setExpandedKeys((prev: any) => {
      return expanded ? prev.filter((i: any) => i !== record.id) : [...prev, record.id];
    });
    callback(record, e);
  };

  const handleDragEnd = (data: DragEndEvent) => {
    if (data?.active && data?.over) {
      onDragEnd && onDragEnd(data, itemsKey);
    }
  };
  // close tree drag
  const onDragStart = (data: DragStartEvent) => {
    isTree &&
      setExpandedKeys((prev: any) => {
        return prev?.filter((i: any) => i !== data?.active?.id);
      });
  };
  return (
    <div
      className={classNames('custom-ant-table', {
        'disable-drag': disableDrag,
        'has-icon': isTree || !disableDrag,
        'table-drag': !disableDrag,
      })}
    >
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        onDragStart={onDragStart}
      >
        <SortableContext
          // rowKey array
          items={itemsKey}
          strategy={verticalListSortingStrategy}
          disabled={disableDrag}
        >
          <Table
            {...rest}
            showSorterTooltip={false}
            pagination={false}
            components={{
              body: {
                row: (e: any) => <Row {...e} />,
              },
            }}
            rowClassName={(record) => {
              const isExpand = expandedKeys.includes(record?.id);
              return isExpand ? 'expandedRow' : '';
            }}
            rowKey='id'
            columns={columns}
            dataSource={dataSource}
            expandable={{
              expandIcon: ({ expanded, onExpand, record }) => {
                const showExpand = record?.children?.length > 0;
                if (!showExpand) {
                  return <></>;
                }
                return (
                  <CustomIcon
                    onExpand={(e) => handleExpanded(e, onExpand, record, expanded)}
                    src={
                      expanded
                        ? '/svgIcon/ic-eva_arrow-ios-downward-fill.svg'
                        : '/svgIcon/ic-eva_arrow-ios-forward-fill.svg'
                    }
                  />
                );
              },
            }}
            expandedRowKeys={expandedKeys}
            locale={{
              emptyText: emptyText ?? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chưa có dữ liệu' />
              ),
              filterReset: 'Bỏ lọc',
              filterConfirm: 'Xong',
              filterCheckall: false,
              filterSearchPlaceholder: 'Tìm kiếm',
            }}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};
export default CustomTable;
const CustomIcon = ({ onExpand, src }: { onExpand: (e: any) => void; src: string }) => {
  return <img src={src} className='table-icon' alt='' onClick={onExpand} />;
};
