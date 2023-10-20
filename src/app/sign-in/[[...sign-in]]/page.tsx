import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='w-full mt-24 flex justify-center'>
			<div className='flex flex-col items-center gap-2'>
				<SignIn />
			</div>
		</div>
	);
}
