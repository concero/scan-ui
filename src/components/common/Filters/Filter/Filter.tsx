import { ReactNode } from 'react'
import { VStack } from '../../Stack'
import { Text } from '../../Text/Text'
import cls from './Filter.module.pcss'

export const Filter = ({ title, isFull, children }: { title: ReactNode; isFull?: boolean; children: ReactNode }) => {
	const Title =
		typeof title == 'string' ? (
			<Text variant="heading_small" className={cls.text}>
				{title}
			</Text>
		) : (
			title
		)

	return (
		<VStack gap="space_0_5" max={isFull}>
			{Title}
			{children}
		</VStack>
	)
}
