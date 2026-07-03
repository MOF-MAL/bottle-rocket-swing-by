# Bottle Rocket Swing-by (ペットボトルロケット・スイングバイ)

## 概要
ペットボトルロケットを操作し、宇宙空間に配置された惑星の重力（スイングバイ）を利用しながら、なるべく低コストで目的地への到達を目指す2.5D物理演算ゲームです。

## ゲームのルール・仕様
- **目的**: ロケットを目的地（ゴール）まで到達させること。
- **コスト計算**: 「選択した機体のベースコスト」＋「水の量」＋「空気の量」で総合コストが決定する。
- **スコア計算**: `(目的地までの到達度や芸術点などの報酬) - (総合コスト) = スコア`
- **失敗条件（バースト）**: 水と空気の量が多すぎると、機体の許容内圧を超えてペットボトルが破裂しゲームオーバーとなる。
- **物理挙動**: 惑星の重力引力、ロケットの噴射力などを物理演算でシミュレーションする（Z軸の移動を固定した2.5Dアクション）。

## 技術スタック
本プロジェクトは、以下の技術を使用して開発されています。

- **Frontend / Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: TypeScript
- **3D Rendering**: [Three.js](https://threejs.org/) / [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Physics Engine**: [@react-three/rapier](https://rapier.rs/docs/user_guides/javascript/getting_started_react)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Prisma](https://www.prisma.io/)
- **3D Modeling**: Blender (Export to `.glb`)

## 開発ロードマップ

- [ ] **Phase 1: コアメカニクス（物理演算）の実装**
  - [ ] プリミティブな図形（Box, Sphere）でのロケットと惑星の配置
  - [ ] 惑星の引力（万有引力）の計算と適用
  - [ ] 水/空気量に基づく内圧計算と破裂判定
  - [ ] 噴射による推進力（AddForce）の実装
- [ ] **Phase 2: UIとゲームサイクルの実装**
  - [ ] タイトル〜パラメータ設定〜ゲームプレイ〜リザルトの画面遷移
  - [ ] 水と空気を設定するスライダーUIの実装
  - [ ] スコア（報酬 - コスト）の計算ロジック実装
- [ ] **Phase 3: 3Dモデルの適用**
  - [ ] Blenderでのロケット・惑星のモデリングと `.glb` エクスポート
  - [ ] ゲーム内の仮オブジェクトを3Dモデルに差し替え
- [ ] **Phase 4: バックエンド（ランキング）の実装**
  - [ ] Prismaスキーマの定義（プレイヤー名、スコア、コスト等）
  - [ ] Supabaseへの接続設定
  - [ ] スコアの保存とランキング取得APIの実装・UI反映

## セットアップ方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev