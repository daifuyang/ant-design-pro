import { getRoles } from '@/services/role';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

const Role = () => {
  type RoleItem = {
    id: number;
    roleName: string;
    permissions: string;
    displayOrder: number;
    status: 0 | 1;
    createTime: string;
  };

  const columns: ProColumns<RoleItem>[] = [
    {
      title: '角色编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '权限字符',
      dataIndex: 'permissions',
      key: 'permissions',
    },
    {
      title: '显示顺序',
      dataIndex: 'displayOrder',
      key: 'displayOrder',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <span>{status === 'active' ? '启用' : '禁用'}</span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  return (
    <ProTable<RoleItem>
      columns={columns}
      cardBordered
      request={async (params = {}) => {
        const res = await getRoles(params);
        if (res.code === 1) {
          return {
            success: true,
            data: res.data.data,
            msg: res.msg,
          };
        }
        return {
          success: false,
          data: [],
          msg: res.msg,
        };
      }}
      rowKey="id"
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="角色列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {}}
          type="primary"
        >
          新建
        </Button>,
        <Button key="export" icon={<ExportOutlined />} onClick={() => {}}>
          导出
        </Button>,
      ]}
    />
  );
};

export default Role;
