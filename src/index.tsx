import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

//console.log('test')

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settingArticle, setSettingArticle] = useState<ArticleStateType>(defaultArticleState)
	const updateSettings = (settings: ArticleStateType) => {
		setSettingArticle({
			...settingArticle, 
			fontFamilyOption: settings.fontFamilyOption,
			fontSizeOption: settings.fontSizeOption,
			fontColor: settings.fontColor,
			backgroundColor: settings.backgroundColor,
			contentWidth: settings.contentWidth,
		})
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settingArticle.fontFamilyOption.value,
					'--font-size': settingArticle.fontSizeOption.value,
					'--font-color': settingArticle.fontColor.value,
					'--container-width': settingArticle.contentWidth.value,
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
