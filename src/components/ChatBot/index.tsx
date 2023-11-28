/* eslint-disable multiline-ternary */
/* eslint-disable unicorn/no-new-array */
import { useMemo, useState } from 'react';

import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Avatar, Button, Col, Form, Image, Row, Spin, Tag } from 'antd';
import { useAtom } from 'jotai';

import { IProductData, TProductSize } from '@/api/interface';
import { atomShowChatBot } from '@/store/showChatbot/showChatbot';

import {
  dataQuestion,
  filterArrayByKeyword,
  formatBotAnswer,
  formatQuestionUser,
  listQA,
} from './contants';
import styles from './index.module.scss';
import { useGetAnswer, useGetListFAQS } from './service';
import InputField from '../UI/InputField';
import InputTextArea from '../UI/InputTextArea';
import Text from '../UI/Text';

const ChatBot = () => {
  const [, setShowChatBot] = useAtom(atomShowChatBot);
  const [fined, setFined] = useState<any>(undefined);
  const [form] = Form.useForm();
  const [size, setSize] = useState<TProductSize>();

  const [listQA, setListQA] = useState<listQA[]>([
    {
      type: 'bot',
      text: 'Xin chào chúng tôi có thể giúp gì cho bạn?',
      data: undefined,
    },
  ]);

  const { data: dataFAQS, run: onSearch } = useGetListFAQS({ manual: false });

  const { run, loading } = useGetAnswer({
    onSuccess(res) {
      if (res?.answer && typeof res.answer === 'string') {
        const botAnswer: listQA[] = formatBotAnswer(res.answer);
        setListQA((prev) => [...botAnswer, ...prev]);

        return;
      }

      if (res?.answer?.data) {
        const botAnswer: listQA[] = formatBotAnswer('', res.answer?.data);
        setListQA((prev) => [...botAnswer, ...prev]);
      }
    },
  });

  const onFinish = (value: any) => {
    const newListQA = [...formatQuestionUser(value.question), ...listQA];
    setListQA(newListQA);

    run({ question: value.question });
    form.resetFields();
  };

  const onClickTag = (e: string) => {
    const newListQA = [...formatQuestionUser(e), ...listQA];

    setListQA(newListQA);

    run({ question: e });
  };

  const onClose = () => setShowChatBot(false);

  const listQuestion = useMemo(() => {
    const newStringQs: string[] =
      dataFAQS?.data?.length > 0 ? dataFAQS?.data?.map((data: any) => data?.question) : [];
    return fined ?? [...dataQuestion, ...newStringQs];
  }, [dataFAQS, fined]);

  const onFieldsChange = useDebounceFn(
    (e) => {
      onSearch(e.target.value);
      const arrayFinded = filterArrayByKeyword(listQuestion, e.target.value);
      if (e.target.value) {
        setFined(arrayFinded);
      } else {
        setFined(undefined);
      }
    },
    {
      wait: 500,
    },
  );
  return (
    <div className={styles.root}>
      <Row className={styles.wrapFAQS}>
        <Row className={styles.headSearch}>
          <InputField placeholder='Tìm kiếm câu hỏi FAQS' onChange={onFieldsChange.run} />
        </Row>
        <div className={styles.listQuestionDefault}>
          {listQuestion?.length > 0 ? (
            listQuestion?.map((tag: any) => {
              return (
                <Tag key={`tag-${tag}`} className={styles.tag} onClick={() => onClickTag(tag)}>
                  {tag}
                </Tag>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </Row>
      <Row className={styles.wrap}>
        <Row className={styles.head}>
          <Text type='heading5-bold'>Chat bot</Text>
          <CloseOutlined className={styles.iconClose} onClick={onClose} />
        </Row>
        <div className={styles.content}>
          {listQA.map((e: listQA, key: number) => {
            return (
              <div key={`question-answer+${key}`} id={`chat-${key}`}>
                <div className={styles.itemChat}>
                  <Avatar
                    src={
                      e.type === 'bot'
                        ? 'https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-button-robot-cute-cartoon-clever-emoticon-package-png-image_357851.jpg'
                        : 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                    }
                    size={36}
                    className={styles.avatar}
                  />
                  <div>
                    {!e?.data && (
                      <Text type='body-regular' color='text-primary'>
                        {e?.text}
                      </Text>
                    )}
                  </div>
                </div>
                {e?.data && (
                  <Row gutter={16} className={styles.rowData}>
                    {e?.data?.map((ele: IProductData) => {
                      return (
                        <Col key={ele.name} span={6} className={styles.colProduct}>
                          <Image
                            preview={false}
                            alt=''
                            src={ele.image}
                            className={styles.imageQS}
                          />
                          <Text
                            type='body-regular'
                            color='text-primary'
                            className={styles.ellipsText}
                          >
                            {ele?.name}
                          </Text>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </div>
            );
          })}
          {loading && (
            <div className={styles.loading}>
              <Spin spinning={true}></Spin>
              <Text type='body-regular' color='text-secondary'>
                Đang tải câu trả lời vui lòng đợi trong giây lát ...
              </Text>
            </div>
          )}
        </div>
        <Row className={styles.footer}>
          <Form form={form} onFinish={onFinish}>
            <Row align={'middle'} justify={'space-between'} className={styles.rowItem} gutter={16}>
              <Col span={22}>
                <Form.Item name='question' noStyle>
                  <InputTextArea placeholder='Nhập câu hỏi' rows={2} disabled={loading} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item noStyle dependencies={['question']}>
                  {(props: any) => {
                    const question = props?.getFieldValue(['question']);
                    return (
                      <Button
                        htmlType='submit'
                        icon={<SendOutlined />}
                        className={styles.btnSend}
                        type='primary'
                        disabled={!question}
                      />
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Row>
    </div>
  );
};
export default ChatBot;
