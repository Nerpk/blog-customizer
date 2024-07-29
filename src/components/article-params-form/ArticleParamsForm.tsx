import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';

//константы
import { OptionType, defaultArticleState, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, ArticleStateType } from 'src/constants/articleProps';

//элементы из проекта
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text'

export const ArticleParamsForm = (props: {onClick: (settings: ArticleStateType)=>void}) => {
	//открытие закрытие формы
	const [isOpen, setIsOpen] = useState(false);
	const refForm = useRef<HTMLFormElement | null>(null);
	const toggleForm = () => {
		setIsOpen(!isOpen);
	};
	useEffect(() => {
	  const handleClickOutside = (e: MouseEvent) => {
		if (refForm.current && !e.composedPath().includes(refForm.current) && isOpen) {
			toggleForm()
		}
	  };
  
	  document.addEventListener('click', handleClickOutside);
	  return () => {
		document.removeEventListener('click', handleClickOutside);
	  };
	}, [isOpen]);

	//обновление страницы
	const settings = (): ArticleStateType => {
		return {
			fontFamilyOption: selectedFontOption,
			fontSizeOption: selectedSizeFontOption,
			fontColor: selectedColorFontOption,
			backgroundColor: selectedColorBGOption,
			contentWidth: selectedContentWidthOption,
		}
	}
	const resetSettings = (): ArticleStateType => {
		event?.preventDefault()

		handleFontOptionChange(defaultArticleState.fontFamilyOption);
		handleSizeFontOptionChange(defaultArticleState.fontSizeOption);
		handleSizeColorOptionChange(defaultArticleState.fontColor);
		handleColorBGOptionChange(defaultArticleState.backgroundColor);
		handleContentWidthOptionChange(defaultArticleState.contentWidth);

		//toggleForm();           //опционально: если нужно закрывать форму после изменений, убрать коментирование

		props.onClick(defaultArticleState)
		return defaultArticleState;
	}
	const applySettings = () => {
		event?.preventDefault()
		//toggleForm();           //опционально: если нужно закрывать форму после изменений, убрать коментирование
		props.onClick(settings())
		return settings();
	}
	
	//внутренность формы
	const [selectedFontOption, setSelectedFontOption] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const handleFontOptionChange = (option: OptionType) => {
		setSelectedFontOption(option);
	};

	const [selectedSizeFontOption, setSelectedSizeFontOption] = useState<OptionType>(defaultArticleState.fontSizeOption)
	const handleSizeFontOptionChange = (option: OptionType) => {
		setSelectedSizeFontOption(option);
	};

	const [selectedColorFontOption, setSelectedColorFontOption] = useState<OptionType>(defaultArticleState.fontColor);
	const handleSizeColorOptionChange = (option: OptionType) => {
		setSelectedColorFontOption(option);
	};

	const [selectedColorBGOption, setSelectedColorBGOption] = useState<OptionType>(defaultArticleState.backgroundColor);
	const handleColorBGOptionChange = (option: OptionType) => {
		setSelectedColorBGOption(option);
	};

	const [selectedContentWidthOption, setSelectedContentWidthOption] = useState<OptionType>(defaultArticleState.contentWidth);
	const handleContentWidthOptionChange = (option: OptionType) => {
		setSelectedContentWidthOption(option);
	};

	return (
	  <>
		<ArrowButton onClick={toggleForm} isOpen={isOpen} />
		<aside className={[styles.container, isOpen?styles.container_open:''].join(' ')} >
		  <form className={styles.form} ref={refForm}>
		  <Text as="h2" size={31} uppercase weight={800}>Задайте параметры</Text>

			<Select 
				selected={selectedFontOption} 
				options={fontFamilyOptions}
				placeholder='Выберите шрифт'
				title='Шрифт'
				onChange={handleFontOptionChange}
			/>
			<RadioGroup 
				name='Размер шрифта'
				options={fontSizeOptions}
				selected={(selectedSizeFontOption as OptionType)}
				title='Размер шрифта'
				onChange={handleSizeFontOptionChange}
			/>
			<Select 
				selected={selectedColorFontOption} 
				options={fontColors}
				placeholder='Выберите цвет шрифта'
				title='Цвет шрифта'
				onChange={handleSizeColorOptionChange}
			/>

			<Separator />

			<Select 
				selected={selectedColorBGOption} 
				options={backgroundColors}
				placeholder='Выберите цвет фона'
				title='Цвет фона'
				onChange={handleColorBGOptionChange}
			/>
			<Select 
				selected={selectedContentWidthOption} 
				options={contentWidthArr}
				placeholder='Выберите размер страницы'
				title='Ширина контента'
				onChange={handleContentWidthOptionChange}
			/>

			<div className={styles.bottomContainer}>
			  <Button title="Сбросить" type="reset" onClick={resetSettings}/>
			  <Button title="Применить" type="submit" onClick={applySettings}/>
			</div>
		  </form>
		</aside>
	  </>
	);
  };