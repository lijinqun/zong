<template>
    <div class="printContainer">
        <a @click="print" class="noprint">打印</a>
        <div>
            <h1 class="title">({{name}})今日总订单</h1>
            <h2 class="subTitle">{{deliveryDateFrom}} - {{deliveryDateTo}}</h2>
            <div class="mainprint">
                <table class="tablePrint" cellspacing="0" cellpadding="0">
                    <tbody v-for="(item, index) in tableData" class="group">
                    <tr>
                        <td width="60">{{(index +1)}}</td>
                        <td width="100">{{item.goodsCatName}}</td>
                        <td width="200">{{item.goodsName}}</td>
                        <td width="60">{{item.totalQuantity}}</td>
                        <td>{{item.details}}</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
    import {getplatformorder} from '@/views/api/api.js';

    export default {
        data() {
            return {
                deliveryDateFrom: '',
                deliveryDateTo: '',
                name: '平台',
                state: false,
                operName: '',
                tableData: [],
                spinShow: true
            };
        },
        mounted() {
            var that = this;
            var style = document.getElementById('allStyle');
            style.innerHTML = '';
            var data = sessionStorage.getItem('printPerson');
            data = JSON.parse(data);
            console.log(data);
            var param = {
                pageNumber: 1,
                pageSize: 10000,
                operNo: data.operNo,
                deliveryDateFrom: data.deliveryDateFrom,
                deliveryDateTo: data.deliveryDateTo,
                goodsCatId: data.goodsCatId
            };
            getplatformorder(param).then(response => {
                // 字面量赋值会丢失当前页数
                var lists = response.data.list;
                this.deliveryDateFrom = data.deliveryDateFrom;
                this.deliveryDateTo = data.deliveryDateTo;
                this.tableData = lists;
                this.name = data.operName || data.parentOperName || '平台';
                console.log(that.tableData);
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
