'use client'

import DestructiveButton from "@/components/common/buttons/DestructiveButton";
import Hyperlink from "@/components/common/buttons/Hyperlink";
import IconButton from "@/components/common/buttons/IconButton";
import OutlineButton from "@/components/common/buttons/OutlineButton";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";
import CheckboxWithText from "@/components/common/inputs/CheckboxWithText";
import TextInput from "@/components/common/inputs/TextInput";
import { FaPlus, FaTrashCan, FaArrowRight } from "react-icons/fa6";

export default function TestPage() {
    return (
        <div className="p-8">
            <div className="flex">
                <div className="px-2">
                    <PrimaryButton text="Primary" onClick={() => { }}></PrimaryButton>
                </div>
                <div className="px-2">
                    <PrimaryButton text="PrimaryDisabled"></PrimaryButton>
                </div>
                <div className="px-2">
                    <SecondaryButton text="Secondary" onClick={() => { }}></SecondaryButton>
                </div>
                <div className="px-2">
                    <OutlineButton text="OutlineButton" onClick={() => { }}></OutlineButton>
                </div>
                <div className="px-2">
                    <DestructiveButton text="Destructive" onClick={() => { }}></DestructiveButton>
                </div>
                <div className="px-2">
                    <DestructiveButton text="DestructiveDisabled"></DestructiveButton>
                </div>
                <div className="px-2">
                    <IconButton Icon={FaPlus} onClick={() => { }}></IconButton>
                </div>
                <div className="px-2">
                    <IconButton Icon={FaPlus} text="ButtonWithLeftIcon" onClick={() => { }}></IconButton>
                </div>
                <div className="px-2">
                    <IconButton Icon={FaArrowRight} text="ButtonWithRightIcon" rightIcon onClick={() => { }}></IconButton>
                </div>
                <div className="px-2">
                    <IconButton Icon={FaTrashCan} text="ButtonWithLeftIconDestructive" variant="destructive" onClick={() => { }}></IconButton>
                </div>
                <div className="px-2">
                    <Hyperlink text="Hyperlink" href="#"></Hyperlink>
                </div>
            </div>
            <div className="flex mt-4">
                <div className="px-2">
                    <TextInput placeholder="Placeholder"></TextInput>
                </div>
                <div className="px-2">
                    <TextInput placeholder="Disabled" disabled></TextInput>
                </div>
                <div className="px-2">
                    <CheckboxWithText text="Checkbox with text" checked={false}></CheckboxWithText>
                </div>
                <div className="px-2">
                    <CheckboxWithText disabled text="Checkbox with text disabled" checked={false}></CheckboxWithText>
                </div>
                <div className="px-2">
                    <CheckboxWithText text="Checkbox with text checked" checked={true}></CheckboxWithText>
                </div>
                <div className="px-2">
                    <CheckboxWithText disabled text="Checkbox with text disabled checked" checked={true}></CheckboxWithText>
                </div>
            </div>
        </div>
    );
}