<template>
    <div class="printContainer">
        <a @click="print" class="noprint">打印</a>
        <div>
            <h1 class="title">今日总订单</h1>
            <h2 class="subTitle">{{deliveryDateFrom}} - {{deliveryDateTo}}</h2>
            <div class="mainprint">
                <table class="tablePrint" cellspacing="0" cellpadding="0">
                    <tbody v-for="item in tableData" class="group">
                    <tr>
                        <td width="60">{{item.no}}</td>
                        <td width="100">{{item.goodsCatName}}</td>
                        <td width="200">{{item.goodsName}}</td>
                        <td width="60">{{item.totalQuantity}}</td>
                        <td></td>
                    </tr>
                    <tr v-for="list in item.lists" class="child">
                        <td></td>
                        <td></td>
                        <td>{{list.person}}</td>
                        <td>{{list.totalQuantity}}</td>
                        <td>{{list.details}}</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    import {getgrouporders} from '@/views/api/api.js';

    export default {
        data () {
            return {
                deliveryDateFrom: '',
                deliveryDateTo: '',
                state: false,
                operName: '',
                tableData: [],
                spinShow: true,
                tableDataa: [
                    {
                        no: 1,
                        goodsCatName: 'A食根',
                        goodsName: '白萝卜/斤',
                        totalQuantity: 18,
                        lists: [
                            {
                                person: '李雄英',
                                totalQuantity: 6,
                                details: '(3.00斤/个) 1个*1份，(3.00斤/个) 3个*1份'
                            },
                            {
                                person: '王爱平',
                                totalQuantity: 12,
                                details: '(3.00斤/个) 1个*1份，(3.00斤/个) 3个*1份'
                            }
                        ]
                    },
                    {
                        no: 2,
                        goodsCatName: 'A食根',
                        goodsName: '青菜/斤',
                        totalQuantity: 18,
                        lists: [
                            {
                                person: '李雄英',
                                totalQuantity: 6,
                                details: '(3.00斤/个) 1个*1份，(3.00斤/个) 3个*1份'
                            },
                            {
                                person: '王爱平',
                                totalQuantity: 12,
                                details: '(3.00斤/个) 1个*1份，(3.00斤/个) 3个*1份'
                            }
                        ]
                    },
                    {
                        no: 3,
                        goodsCatName: 'b食根',
                        goodsName: '红萝卜/斤',
                        totalQuantity: 123,
                        lists: [
                            {
                                person: '李雄英',
                                totalQuantity: 23,
                                details: '(3.00斤/个) 1个*1份'
                            },
                            {
                                person: '王爱平',
                                totalQuantity: 12,
                                details: '(3.00斤/个) 1个*1份，(3.00斤/个) 3个*1份'
                            }
                        ]
                    }
                ]
            };
        },
        mounted () {
            var that = this;
            var style = document.getElementById('allStyle');
            style.innerHTML = '';
            var param = sessionStorage.getItem('print');
            param = JSON.parse(param);
            var data = [];
            var no = 1;
            var editData = [];
            getgrouporders(param).then(response => {
                // 字面量赋值会丢失当前页数
                var lists = response.data.list;
                console.log(lists);
                for (let row of lists) {
                    let length = data.length;
                    if (length) {
                        // 对比
                        for (let i = 0; i < length; i++) {
                            // 判断类型
                            if (editData[i].goodsCatName == row.goodsCatName) {
                                // 判断物料名称
                                if (editData[i].goodsName == row.goodsName) {
                                    editData[i].totalQuantity = (parseInt(parseFloat(editData[i].totalQuantity) * 100) + parseInt(parseFloat(row.totalQuantity) * 100)) / 100;
                                    editData[i].lists.push({
                                        person: row.operName,
                                        totalQuantity: row.totalQuantity,
                                        details: row.details
                                    });
                                } else if (i == length - 1) {
                                    editData.push({
                                        no: no++,
                                        goodsCatName: row.goodsCatName,
                                        goodsName: row.goodsName,
                                        totalQuantity: row.totalQuantity,
                                        lists: [{
                                            person: row.operName,
                                            totalQuantity: row.totalQuantity,
                                            details: row.details
                                        }]
                                    });
                                }
                            } else if (i == length - 1) {
                                // 判断是否匹配最后一个，是则添加
                                editData.push({
                                    no: no++,
                                    goodsCatName: row.goodsCatName,
                                    goodsName: row.goodsName,
                                    totalQuantity: row.totalQuantity,
                                    lists: [{
                                        person: row.operName,
                                        totalQuantity: row.totalQuantity,
                                        details: row.details
                                    }]
                                });
                            }
                        }
                        data = editData.concat();
                    } else {
                        editData.push({
                            no: no++,
                            goodsCatName: row.goodsCatName,
                            goodsName: row.goodsName,
                            totalQuantity: row.totalQuantity,
                            lists: [{
                                person: row.operName,
                                totalQuantity: row.totalQuantity,
                                details: row.details
                            }]
                        });
                        data = editData.concat();
                    }
                    // console.log(data);
                }
                this.deliveryDateFrom = param.deliveryDateFrom;
                this.deliveryDateTo = param.deliveryDateTo;
                this.tableData = data;
                console.log(this.tableData);
                that.spinShow = false;
            });


        },
        methods: {
            print() {
                window.print();
            }
        }
    };

</script>
<style>
    body {
        background: #fff !important;
    }
</style>
<style lang="less" scoped>

    .printContainer {
        position: relative;
        padding: 10px;
        min-width: 1200px;
        .title {
            text-align: center;
            font-size: 30px;
        }
        .subTitle {
            font-size: 20px;
            text-align: center;
            font-weight: 400;
        }
        .mainprint {
            width: 90%;
            min-width: 1200px;
            margin: 20px auto;
        }
    }

    .tablePrint {
        width: 100%;
        td {
            padding: 2px 10px;
            border-bottom: 1px dotted #ccc;
        }
        .group .child:last-child td {
             border-bottom: 2px solid #ccc;
        }
    }

    .noprint {
        position: absolute;
        right: 30px;
        top: 30px;
        font-size: 18px;
    }

    @media print {
        .noprint {
            display: none;
        }
    }
</style>
