<template>
  <div class="echart-page">
      <!-- <div ref="echart" style="max-width: 100%;height: 250px;"></div> -->
  </div>
</template>
<!--<script>
let echart = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
import { getHistorytPrice } from './../../api'
export default {
    name: 'echart-page',
    data () {
        return {
            info: [],
            myEchart: null
        }
    },
    mounted () {
        this.$nextTick(() => {
            getHistorytPrice().then(response => {
                this.info = response.data.list
                let date = []
                this.info.forEach((item, index) => {
                    date[index] = item.date.substring(5)
                })
                date = date.reverse()
                console.log(date)
                let value = []
                this.info.forEach((item, index) => {
                    value[index] = item.price
                })
                value = value.reverse()
                console.log(value)
                const option = {
                    title: {
                        text: `当前珠宝价格: ${this.info[0].price.toFixed(3)}元`,
                        textStyle: {
                            color: '#333',
                            fontSize: 14
                        },
                        padding: [10, 10]
                    },
                    tooltip: {},
                    lenged: {
                        data: ['珠宝价格']
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: { show: false },
                        splitNumber: 5,
                        data: date,
                        boundaryGap: false,
                        max: 'dataMax'
                    },
                    yAxis: [
                        {
                            type: 'value',
                            max: 2.5,
                            position: 'right'
                        }
                    ],
                    series: [
                        {
                            name: '珠宝',
                            type: 'line',
                            data: value,
                            smooth: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    color: '#000'
                                }
                            }
                        }
                    ]
                }
                this.myEchart = echart.init(this.$refs['echart'])
                this.myEchart.setOption(option)
            })
        })
           
    },
    computed: {
        date() {
            const data = []
            this.info.forEach((item, index) => {
                data[index] = item.date.substring(3)
            })
            return data
        },
        value() {
            const data = []
            this.info.forEach((item, index) => {
                data[index] = item.price
            })
            return data
        }
    }
}
</script>

<style>

</style>
