import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';

//константы
import { OptionType, TSettingsArticle, firstSettings, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';

//элементы из проекта
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text'

export const ArticleParamsForm = (props: {onClick: (settings: TSettingsArticle)=>void}) => {
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
	const settings = (): TSettingsArticle => {
		return {
			font: selectedFontOption,
			fontSize: selectedSizeFontOption,
			fontColor: selectedColorFontOption,
			backgroundColor: selectedColorBGOption,
			width: selectedContentWidthOption,
		}
	}
	const resetSettings = (): TSettingsArticle => {
		event?.preventDefault()

		handleFontOptionChange(firstSettings.font);
		handleSizeFontOptionChange(firstSettings.fontSize);
		handleSizeColorOptionChange(firstSettings.fontColor);
		handleColorBGOptionChange(firstSettings.backgroundColor);
		handleContentWidthOptionChange(firstSettings.width);

		//toggleForm();           //опционально: если нужно закрывать форму после изменений, убрать коментирование

		props.onClick(firstSettings)
		return firstSettings;
	}
	const applySettings = () => {
		event?.preventDefault()
		//toggleForm();           //опционально: если нужно закрывать форму после изменений, убрать коментирование
		props.onClick(settings())
		return settings();
	}
	
	//внутренность формы
	const [selectedFontOption, setSelectedFontOption] = useState<OptionType>(firstSettings.font);
	const handleFontOptionChange = (option: OptionType) => {
		setSelectedFontOption(option);
	};

	const [selectedSizeFontOption, setSelectedSizeFontOption] = useState<OptionType>(firstSettings.fontSize)
	const handleSizeFontOptionChange = (option: OptionType) => {
		setSelectedSizeFontOption(option);
	};

	const [selectedColorFontOption, setSelectedColorFontOption] = useState<OptionType>(firstSettings.fontColor);
	const handleSizeColorOptionChange = (option: OptionType) => {
		setSelectedColorFontOption(option);
	};

	const [selectedColorBGOption, setSelectedColorBGOption] = useState<OptionType>(firstSettings.backgroundColor);
	const handleColorBGOptionChange = (option: OptionType) => {
		setSelectedColorBGOption(option);
	};

	const [selectedContentWidthOption, setSelectedContentWidthOption] = useState<OptionType>(firstSettings.width);
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