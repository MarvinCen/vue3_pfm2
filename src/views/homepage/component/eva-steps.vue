<template>
	<a-card :bordered="false" style="height: 100%">
		<template #title>
			<strong>考核进度</strong>
		</template>
		<template #extra>
			<a-select style="width: 200px">
				<a-option>2022</a-option>
				<a-option>2023</a-option>
			</a-select>
		</template>
		<div style="height: 165px; display: flex; align-items: center; justify-content: space-around">
			<a-steps label-placement="vertical" style="justify-content: space-around" current="5">
				<a-step key="1">
					启动
					<template #icon>
						<icon-voice />
					</template>
				</a-step>
				<a-step key="2">
					数据录入
					<template #icon>
						<icon-code-square />
					</template>
				</a-step>
				<a-step key="3">
					成果分配
					<template #icon>
						<icon-code-square />
					</template>
				</a-step>
				<a-step key="4">
					绩效计算
					<template #icon>
						<icon-code-square />
					</template>
				</a-step>
				<a-step key="5">
					绩效公示
					<template #icon>
						<icon-code-square />
					</template>
				</a-step>
				<a-step key="6">
					绩效分配
					<template #icon>
						<icon-code-square />
					</template>
				</a-step>
				<a-step key="7">
					结束
					<template #icon>
						<icon-export />
					</template>
				</a-step>
			</a-steps>
		</div>
	</a-card>

</template>

<script>
export default {
	name: "eva-steps"
}
</script>

<style scoped lang="css">
.arco-card-body {
	height: 90%;
}

</style>