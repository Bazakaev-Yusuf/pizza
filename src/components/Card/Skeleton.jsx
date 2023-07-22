import React from 'react';

import ContentLoader from 'react-content-loader';

import styles from './skeleton.module.scss';

const Skeleton = (props) => (
	<ContentLoader
		className={styles.root}
		speed={1}
		width={280}
		height={466}
		viewBox='0 0 280 466'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}>
		<rect
			x='0'
			y='266'
			rx='10'
			ry='10'
			width='280'
			height='24'
		/>
		<rect
			x='-1'
			y='308'
			rx='10'
			ry='10'
			width='280'
			height='90'
		/>
		<rect
			x='5'
			y='421'
			rx='7'
			ry='7'
			width='90'
			height='27'
		/>
		<rect
			x='125'
			y='410'
			rx='25'
			ry='25'
			width='152'
			height='45'
		/>
		<rect
			x='208'
			y='444'
			rx='0'
			ry='0'
			width='2'
			height='0'
		/>
		<circle
			cx='138'
			cy='128'
			r='125'
		/>
	</ContentLoader>
);

export default Skeleton;
