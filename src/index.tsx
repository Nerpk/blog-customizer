import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, TSettingsArticle, defaultArticleState, firstSettings } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settingArticle, setSettingArticle] = useState<TSettingsArticle>(firstSettings)
	const updateSettings = (settings: TSettingsArticle) => {
		setSettingArticle({
			...settingArticle, 
			font: settings.font,
			fontSize: settings.fontSize,
			fontColor: settings.fontColor,
			backgroundColor: settings.backgroundColor,
			width: settings.width,
		})
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settingArticle.font.value,
					'--font-size': settingArticle.fontSize.value,
					'--font-color': settingArticle.fontColor.value,
					'--container-width': settingArticle.width.value,
					'--bg-color': settingArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onClick={updateSettings} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
