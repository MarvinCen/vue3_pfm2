<template>
	<a-card hoverable :style="{ width: '100%', marginBottom: '20px' }">
		<div
			:style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
		>
      <span
				:style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
			>
        <a-avatar
					:style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
					:size="24"
				>
          A
        </a-avatar>
        <a-typography-text>Username</a-typography-text>
      </span>
			<icon-export />
		</div>
	</a-card>
</template>

<script>
export default {
	name: "fast-in-card"
}
</script>

<style scoped lang="less">

</style>