<style lang="less">
    @import './editable-table.less';
</style>

<template>
    <div>
        <Table :ref="refs" :columns="columnsList" :loading="loading" :data="thisTableData" border disabled-hover
               @on-selection-change="selectedIds" highlight-row></Table>
    </div>
</template>

<script>
    import Bus from '../bus.js';
    const editButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: currentRow.editting ? 'success' : 'primary',
                loading: currentRow.saving
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    if (!currentRow.editting) {
                        if (currentRow.edittingCell) {
                            for (let name in currentRow.edittingCell) {
                                currentRow.edittingCell[name] = false;
                                vm.$store.state.goods.edittingStore[index].edittingCell[name] = false;
                            }
                        }
                        vm.$store.state.goods.edittingStore[index].editting = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                    } else {
                        vm.$store.state.goods.edittingStore[index].saving = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                        let edittingRow = vm.$store.state.goods.edittingStore[index];
                        edittingRow.editting = false;
                        edittingRow.saving = false;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                        vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                    }
                }
            }
        }, currentRow.editting ? '保存' : '编辑');
    };
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗?',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    console.log(vm.thisTableData[index].id);
                    if(vm.thisTableData[index].id){
                    	Bus.$emit('delete',vm.thisTableData[index].id);
                    }
                    vm.thisTableData.splice(index, 1);
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
                    vm.$store.state.goods.edittingStore.splice(index, 1);
                }
            }
        }, [
            h('Button', {
                style: {
                    margin: '0 5px'
                },
                props: {
                    type: 'error',
                    placement: 'top'
                }
            }, '删除')
        ]);
    };
    const incellEditBtn = (vm, h, param) => {
        if (vm.hoverShow) {
            return h('div', {
                'class': {
                    'show-edit-btn': vm.hoverShow
                }
            }, [
                h('Button', {
                    props: {
                        type: 'text',
                        icon: 'edit'
                    },
                    on: {
                        click: (event) => {
                            vm.$store.state.goods.edittingStore[param.index].edittingCell[param.column.key] = true;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                        }
                    }
                })
            ]);
        } else {
            return h('Button', {
                props: {
                    type: 'text',
                    icon: 'edit'
                },
                on: {
                    click: (event) => {
                        vm.$store.state.goods.edittingStore[param.index].edittingCell[param.column.key] = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                    }
                }
            });
        }
    };
    const saveIncellEditBtn = (vm, h, param) => {
        return h('Button', {
            props: {
                type: 'text',
                // icon: 'checkmark'
                icon: 'edit'
            },
            on: {
                click: (event) => {
                    // 原始的数据   vm.thisTableData[param.index][param.column.key]
                    // 修改后的数据 vm.$store.state.goods.edittingStore[param.index][param.column.key]
                    vm.$store.state.goods.edittingStore[param.index].edittingCell[param.column.key] = false;

                    /* if (param.column.key == 'price') {
                        if (vm.thisTableData[param.index][param.column.key] != vm.$store.state.goods.edittingStore[param.index][param.column.key]) {
                            vm.$store.state.goods.edittingStore[param.index].auditStatus = 0;
                        }
                    } */

                    // vm.thisTableData = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                    // vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    // vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
                    // console.log(vm.$store.state.goods.goodsTable);
                }
            },
            style: {
                // visibility: 'hidden'
                display: 'none'
            }
        });
    };
    const cellInput = (vm, h, param, item) => {
        return h('Input', {
            props: {
                type: 'text',
                value: vm.$store.state.goods.edittingStore[param.index][item.key]
            },
            on: {
                'on-change'(event) {
                    let key = item.key;
                    vm.$store.state.goods.edittingStore[param.index][key] = event.target.value;
                    console.log('onchange');
                    Bus.$emit('updatetable',param.index,key,event.target.value);//传回去页面
                    // 离开input焦点就自动传数据回去
                },
                'on-focus'(event) {
                	if (param.column.key == 'spenameid') {
                    let key = item.key;
                    Bus.$emit('changevisible',param.index);
                    console.log('click');
                    // 离开input焦点就自动传数据回去
                   }
                },
                'on-blur'(event) {
//                  if (param.column.key == 'price') {
//                      if (vm.$store.state.goods.goodsTable[param.index][param.column.key] != vm.$store.state.goods.edittingStore[param.index][param.column.key]) {
//                          vm.$store.state.goods.edittingStore[param.index].auditStatus = 0;
//                      }else{
//                          vm.$store.state.goods.edittingStore[param.index].auditStatus = vm.$store.state.goods.goodsTable[param.index].auditStatus;
//                      }
//                  }
                    var data = JSON.parse(JSON.stringify(vm.$store.state.goods.edittingStore));
                    vm.$store.state.goods.edittingStore = data;
                    // log(vm.$store.state.goods.cacheGoodsTable);
                    // console.log(vm.thisTableData);
                    // vm.$emit('input', vm.handleBackdata(vm.$store.state.goods.cacheGoodsTable));
                    // vm.$emit('on-cell-change', vm.handleBackdata(vm.$store.state.goods.cacheGoodsTable), param.index, param.column.key);
                }
            }
        });
    };
    export default {
        name: 'canEditTable',
        props: {
            refs: String,
            loading:Boolean,
            columnsList: Array,
            value: Array,
            url: String,
            editIncell: {
                type: Boolean,
                default: false
            },
            hoverShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                columns: [],
                thisTableData: [],
                edittingStore: []
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let vm = this;
                let editableCell = this.columnsList.filter(item => {
                    if (item.editable) {
                        if (item.editable === true) {
                            return item;
                        }
                    }
                });
                let cloneData = JSON.parse(JSON.stringify(this.value));
                let res = [];
                res = cloneData.map((item, index) => {
                    let isEditting = false;
                    if (this.thisTableData[index]) {
                        if (this.thisTableData[index].editting) {
                            isEditting = true;
                        } else {
                            for (const cell in this.thisTableData[index].edittingCell) {
                                if (this.thisTableData[index].edittingCell[cell] === true) {
                                    isEditting = true;
                                }
                            }
                        }
                    }
                    if (isEditting) {
                        return this.thisTableData[index];
                    } else {
                        this.$set(item, 'editting', false);
                        let edittingCell = {};
                        editableCell.forEach(item => {
                            edittingCell[item.key] = false;
                        });
                        this.$set(item, 'edittingCell', edittingCell);
                        return item;
                    }
                });
                this.thisTableData = res;
                this.$store.state.goods.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
                this.columnsList.forEach(item => {
                    if (item.editable) {
                        item.render = (h, param) => {
                            let currentRow = this.thisTableData[param.index];
                            if (!currentRow.editting) {
                                if (this.editIncell) {
                                    return h('Row', {
                                        props: {
                                            type: 'flex',
                                            align: 'middle',
                                            justify: 'center'
                                        }
                                    }, [
                                        h('Col', {
                                            props: {
                                                span: '22'
                                            }
                                        }, [
                                            // !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item)
                                            !currentRow.edittingCell[param.column.key] ? cellInput(this, h, param, item) : h('span', currentRow[item.key])
                                        ]),
                                        h('Col', {
                                            props: {
                                                span: '2'
                                            }
                                        }, [
                                            // currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param)
                                            currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : saveIncellEditBtn(this, h, param)
                                        ])
                                    ]);
                                } else {
                                    return h('span', currentRow[item.key]);
                                }
                            } else {
                                return h('Input', {
                                    props: {
                                        type: 'text',
                                        value: currentRow[item.key]
                                    },
                                    on: {
                                        'on-change'(event) {
                                            let key = param.column.key;
                                            vm.$store.state.goods.edittingStore[param.index][key] = event.target.value;
                                        }
                                    }
                                });
                            }
                        };
                    }
                    if (item.handle) {
                        item.render = (h, param) => {
                            let currentRowData = this.thisTableData[param.index];
                            let children = [];
                            item.handle.forEach(item => {
                                if (item === 'edit') {
                                    children.push(editButton(this, h, currentRowData, param.index));
                                } else if (item === 'delete') {
                                    children.push(deleteButton(this, h, currentRowData, param.index));
                                }
                            });
                            return h('div', children);
                        };
                    }
                });
            },
            handleBackdata(data) {
                let clonedData = JSON.parse(JSON.stringify(data));
                clonedData.forEach(item => {
                    delete item.editting;
                    delete item.edittingCell;
                    delete item.saving;
                });
                return clonedData;
            },
            selectedIds (value) {
                var ids = '';
                if (value && value.length > 0) {
                    var length = value.length;
                    // 格式化
                    for (let i = 0; i < length; i++) {
                        if (i === length - 1) {
                            ids += value[i].id;
                        } else {
                            ids += value[i].id + ',';
                        }
                    }
                }
                Bus.$emit('selectdelectList', ids);
            }
        },
        watch: {
            value(data) {
                this.init();
            }
        }
    };
</script>
