const column = [
    {
        field: 'groupName',
        title: '推广组',
        width: 100,
        align: 'center',
        content: (item, index, field) => {
          return item.groupName;
        }
    },
    {
        field: 'region',
        title: '地域',
        currentSort: 'des',
        align: 'center',
        width: 60,
        content: (item, index, field) => {
          return item.region;
        }
    },
    {
        field: 'channel',
        title: '频道',
        align: 'center',
        width: 120,
        content: (item, index, field) => {
          return item.channel;
        }
    },
    {
        field: 'startDate',
        title: '开始时间',
        sortable: true,
        align: 'center',
        width: 120,
        content: (item, index, field) => {
          return item.startDate;
        }
    },
    {
        field: 'endDate',
        title: '结束时间',
        align: 'center',
        width: 120,
        content: (item, index, field) => {
          return item.endDate;
        }
    },
    {
        field: 'budget',
        title: '预算',
        escapeContent: false,
        align: 'center',
        width: 100,
        content: (item, index, field) => {
          return item.budget;
        }
    },
    {
        field: 'price',
        title: '出价',
        escapeContent: false,
        align: 'center',
        width: 100,
        content: (item, index, field) => {
          return item.price;
        }
    },
    {
        field: 'clickRate',
        title: '点击率',
        escapeContent: false,
        align: 'center',
        width: 100,
        content: (item, index, field) => {
          return item.clickRate;
        }
    },
    {
        field: 'clickCount',
        title: '点击量',
        escapeContent: false,
        align: 'center',
        width: 100,
        content: (item, index, field) => {
          return item.clickCount;          
        }
    },
    {
        field: 'status',
        title: '状态',
        escapeContent: false,
        align: 'center',
        width: 60,
        content: (item, index, field) => {
            if (item.status == '有效') {
                return `<span style="color:#03b152;">${item.status}</span>`;
            }

            if (item.status == '暂停') {
                return `<span style="color:#a56027;">${item.status}</span>`;
            }
        }
    }
];

export default column;