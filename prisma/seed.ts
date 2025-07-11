import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	// クリーンアップ
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	const hashedPassword = await bcrypt.hash('password123', 12); // 暗号化

	const dummyImages = [
		'https://picsum.photos/seed/post1/600/400', // ダミー画像
		'https://picsum.photos/seed/post2/600/400',
	];

	// ユーザー作成
	const user = await prisma.user.create({
		data: {
			email: 'test@example.com',
			name: 'Test User',
			password: hashedPassword,
			posts: {
				create: [
					{
						title: 'はじめてのブログ投稿',
						content:
							'これは最初のブログ投稿です。Next.jsとPrismaでブログを作成しています。',
						topImage: dummyImages[0],
						published: true,
					},
					{
						title: '2番目の投稿',
						content:
							'ブログの機能を少しずつ追加していきます。認証機能やダッシュボードなども実装予定です。',
						topImage: dummyImages[1],
						published: true,
					},
				],
			},
		},
	});

	console.log('✅ シードデータが正常に作成されました！');
	console.log('📧 テストユーザー:', user.email);
	console.log('👤 ユーザー名:', user.name);
}

main()
	.catch((e) => {
		console.error('❌ シードデータの作成に失敗しました:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
